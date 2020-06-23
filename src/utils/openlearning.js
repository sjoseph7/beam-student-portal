import crypto from 'crypto'
import { api_get } from '../context/profile'

export function makeOpenLearningSSOHandler(link, token) {
  return performSSOExchange

  async function performSSOExchange(e) {
    e.preventDefault()
    e.stopPropagation()

    const { ssoUrl } = await api_get(token, '/sso/open-learning')
    const url = new URL(ssoUrl)
    const urlParams = new URLSearchParams(url.search)
    url.search = ''

    const buf = crypto.randomBytes(256)
    const nonce = buf
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(-8)

    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.name = nonce
    iframe.id = nonce
    document.body.appendChild(iframe)

    if (iframe.contentWindow.document.readyState !== 'complete')
      await new Promise((resolve) => (iframe.onload = resolve))

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = url.toString()
    form.target = nonce

    for (const [key, value] of urlParams) {
      const el = document.createElement('input')
      el.type = 'hidden'
      el.name = key
      el.value = value
      form.appendChild(el)
    }

    document.body.appendChild(form)
    form.submit()

    await new Promise((resolve) => (iframe.onload = resolve))

    window.open(link, '_blank', 'noopener,noreferrer')
  }
}
