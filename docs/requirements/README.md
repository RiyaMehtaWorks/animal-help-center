# Requirements — v2

- Status: Draft (v2)
- Date: 2026-10-16
- Related: ADR-0001 (repository structure)

## 1. Actors

| Actor           | Who they are                                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------- |
| Visitor         | Anyone without an account. Reads free care blogs, sees the AI assistant but must sign up to use it. |
| Caregiver       | The person looking after an animal (owner, feeder, rescuer). Asks for help.                         |
| Vet             | A licensed veterinarian. Gives medical advice once verified.                                        |
| Field Volunteer | Gives practical help (e.g. transporting an animal). Does NOT give medical advice.                   |
| Admin           | Runs the platform: verifies vets and volunteers, removes bad actors.                                |

## 2. Use cases

### Caregiver

- Search vets by specialty, name, degree, and animals treated (incl. exotic pets)
- Chat with vets
- Post a help request visible to all vets
- Use the AI assistant (advisory, not diagnosis)

### Vet

- See and claim open help requests
- Chat with caregivers
- Give advice

### Admin

- Verify vets (manual license check / KYC)
- Suspend or remove users immediately
- Audit activity

## 3. Key rules

### Vet verification

A vet account moves through these states:

    PENDING ──► VERIFIED ──► EXPIRED     (automatic, on license expiry date)
       │            │
       │            └──────► SUSPENDED   (admin, e.g. after a report)
       └──► REJECTED

- Only VERIFIED vets can give advice. Until then they have caregiver-level access.
- Suspensions are caught by: periodic re-checks, a "report this vet" button, and instant admin suspension.
- If a vet is suspended mid-consultation: the chat stays, the caregiver is notified, and the case moves to another VERIFIED vet who can see the chat history.

### Help-post claiming

- When a vet claims a help post, it disappears for other vets.
- If the vet doesn't reply: 3 reminders, 5–10 minutes apart, then a final warning, then the post is released to all vets. The caregiver is told.
- If the original vet and a new vet claim at the same moment, the original vet keeps the case.
- Claims must be atomic: only one vet can win a claim (no double claims).

### Urgency

- Urgency is decided from symptoms (structured questions), not from the caregiver's own rating.
- Levels: Emergency / Urgent / Routine.
- When unsure, the system picks the MORE urgent level.
- The list of red-flag symptoms must come from a veterinarian or a trusted veterinary source.

## 4. Demo scope (target: ~10 weeks)

| In the demo              | Later                                               |
| ------------------------ | --------------------------------------------------- |
| Vet verification (admin) | Blogs                                               |
| Search vets              | Field Volunteer role                                |
| Chat                     | Prescriptions / advice notes (legal rules to check) |
| Help posts with claiming | Paid consultations (designed for, not built)        |
| AI assistant (RAG)       |                                                     |

## 5. Open questions

- What should the app show or do for an Emergency case, when no vet may reply in time?

## 6. Non-functional requirements

| ID    | Requirement                                                                                                         | → Which means                                                                               |
| ----- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| NFR-1 | A help post with one photo reaches the server within 30 s on 3G and is not lost if the connection drops             | Compress images on the device, send text before photo, offline queue with retry (IndexedDB) |
| NFR-2 | If the AI assistant is down, vet chat and help posts keep working                                                   | Timeouts on all Node → RAG calls, friendly fallback message pointing to help posts          |
| NFR-3 | Only a consultation's participants (caregiver, current/past non-suspended vets) can view it; admin access is logged | Authorization check on every consultation endpoint, not just login                          |
