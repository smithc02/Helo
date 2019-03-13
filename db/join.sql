SELECT pictures.photos, users.id, users.username
FROM users
JOIN pictures ON pictures.users_id = users.id