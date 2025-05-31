
function generateUserId(role) {
  const year = new Date().getFullYear().toString().slice(-2);
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  const prefix = role === 'student' ? 'S' : 'T';
  return `${prefix}${year}-${randomStr}`;
}

module.exports = generateUserId;

