# User API

## `GET /users`

**Response:** 

- Status Code: 200

Sample Response:

```json
{
	"first_name": "Goober",
	"last_name": "T Cat",
	"username": "goobs",
	"email": "goobs@cat.com"
}
```

## `POST /users`

**Body Parameters:**

- first_name: *String*
- last_name: *String*
- username: *String*
- email: *String*

**Response:**

- Status Code: 201

Sample Response:

```json
{
	"first_name": "Goober",
	"last_name": "T Cat",
	"username": "goobs",
	"email": "goobs@cat.com"
}
```

## `GET /users/:id/edit`

**Response:** 

- Status Code: 200

Sample Response:

```json
{
	"first_name": "Goober",
	"last_name": "T Cat",
	"username": "goobs",
	"email": "goobs@cat.com"
}
```

## `PUT /users/:id`

**Body Parameters:**

- first_name: *String*
- last_name: *String*
- username: *String*
- email: *String*

**Response:**

- Status Code: 204

Sample Response:

```json
{
	success: "User updated successfully"
}
```

## `DELETE /users/:id/edit`

**Response:** 

- Status Code: 200

Sample Response:

```json
{
	success: "User deleted successfully"
}
```