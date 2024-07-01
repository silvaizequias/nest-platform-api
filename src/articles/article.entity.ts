export class ArticleEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  spotlight: boolean
  private: boolean
  slug: string
  title: string
  subject: string
  resume: string
  content: string
  tags: string
}
