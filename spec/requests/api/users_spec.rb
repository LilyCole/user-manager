require "rails_helper"

describe "User API Tests" do
  it "GET /users should return 200" do
    get "/users"

    expect(response).to have_http_status(200)
  end

  it "POST /users should return 201" do
    post "/users", params: {
      user: {
        first_name: "Foo",
        last_name: "Bar",
        username: "foobar",
        email: "foobar@gmail.com"
      }
    }

    expect(response).to have_http_status(201)
  end

  it "POST /users should return 400 for bad request" do
    post "/users", params: {
      user: {
        first_name: "Foo",
        last_name: "Bar",
        email: "foobar@gmail.com"
      }
    }

    expect(response).to have_http_status(400)
  end

  it "GET /users/:id/edit should return 200" do
    user = User.create(first_name: "Test", last_name: "Name", username: "test", email: "test@test.com")
    
    get "/users/#{user.id}/edit"

    expect(response).to have_http_status(200)
  end

  it "PUT /users/:id/edit should return 200" do
    user = User.create(first_name: "Test", last_name: "Name", username: "test", email: "test@test.com")

    put "/users/#{user.id}", params: {
      user: {
        first_name: "Goo",
        last_name: "Bar",
        username: "goobar",
        email: "goobar@gmail.com"
      }
    }

    expect(response).to have_http_status(200)
  end

  it "DELETE /users/:id/edit should return 410" do
    user = User.create(first_name: "Test", last_name: "Name", username: "test", email: "test@test.com")

    delete "/users/#{user.id}"

    expect(response).to have_http_status(410)
  end
end
