class User < ApplicationRecord
  has_secure_password
  validates :first_name, :last_name, :email, :username, :password, presence: true
  validates :username, uniqueness: true
end
