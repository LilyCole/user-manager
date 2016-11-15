class User < ApplicationRecord
  validates :first_name, :last_name, :email, :username, :password, presence: true
  validates :username, uniqueness: true
end
