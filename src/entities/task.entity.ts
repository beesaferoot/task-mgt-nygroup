export class Task {
  id: number
  description: string
  startDate: Date
  endDate: Date
  status: "TODO" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  userId: number
  createdAt: Date
}
