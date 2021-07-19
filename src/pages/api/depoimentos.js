import { SiteClient } from 'datocms-client'

export default async function getRequest(req, res) {
  if (req.method === 'POST') {
    const TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_KEY_FULL
    const client = new SiteClient(TOKEN)

    const record = await client.items.create({
      itemType: '977303', //ID do model no Dato CMS
      ...req.body,
    })

    res.json({ message: 'sucesso', record: record })
    return
  }

  res.status(404).json({
    message: 'Ainda não tem nada no GET mas no POST tem!',
  })
}

/* E-mail Dato CMS: voyetig768@eyeremind.com */
