export const messages = []

// Message model for in-memory storage.
// Fields: id, body, attachments (array), destinationId, senderId,
// type (text/image/emoji), createdAt, updatedAt, deleted (soft-delete boolean)

function _genId() {
  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 10000)}`
}

export function createMessage(payload = {}) {
  const now = new Date().toISOString()
  const msg = {
    id: _genId(),
    body: payload.body || '',
    attachments: Array.isArray(payload.attachments) ? payload.attachments : [],
    destinationId: payload.destinationId || null,
    senderId: payload.senderId || null,
    type: payload.type || 'text',
    createdAt: now,
    updatedAt: now,
    deleted: false
  }
  messages.push(msg)
  return msg
}

export function getMessageById(id) {
  return messages.find(m => m.id === id && !m.deleted) || null
}

export function getMessagesByDestination(destinationId) {
  return messages.filter(m => m.destinationId === destinationId && !m.deleted)
}

export function getMessagesBySender(senderId) {
  return messages.filter(m => m.senderId === senderId && !m.deleted)
}

export function updateMessage(id, patch = {}) {
  const msg = messages.find(m => m.id === id && !m.deleted)
  if (!msg) return null
  Object.keys(patch).forEach(k => {
    if (k === 'id' || k === 'createdAt') return
    msg[k] = patch[k]
  })
  msg.updatedAt = new Date().toISOString()
  return msg
}

export function softDeleteMessage(id) {
  const msg = messages.find(m => m.id === id && !m.deleted)
  if (!msg) return false
  msg.deleted = true
  msg.updatedAt = new Date().toISOString()
  return true
}

export function listMessages({ includeDeleted = false } = {}) {
  return includeDeleted ? messages.slice() : messages.filter(m => !m.deleted)
}
