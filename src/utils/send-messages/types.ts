export type SendEmailType = {
  bbc?: string
  body: string
  from?: string
  subject: string
  to: string
}

export type SendSmsType = {
  content: string
  to: string
}

export type WelcomeToThePlatformTemplateType = {
  name: string
  password: string
  phone?: string
}

export type InviteMemberToOrganizationTemplateType = {
  member: string
  organization: string
  role: string
}

export type NewOrganizationTemplateType = {
  name: string
  organization: string
}
