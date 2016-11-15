class UsersController < ApplicationController

  def index
    render :json => User.all, status: 200
  end

  def create
    user = User.create(user_params)

    if user.valid?
      render :json => user, status: 201
    else
      render :json => {error: "User validation failed"}, status: 400
    end
  end

  def edit
    user = User.find(params[:id])
    
    render :json => user, status: 200
  end

  def update
    user = User.find(params[:id])

    if user.update(user_params)
      render :json => user, status: 200
    else
      render :json => {error: "User validation failed"}, status: 400
    end
  end

  def destroy 
    user = User.find(params[:id])
    if user.destroy
      render :json => {success: "User deleted"}, status: 410
    else
      render :json => {error: "User deletion failed"}, status: 400
    end

  end

  private

  def user_params
    params.require(:user).permit(:first_name,:last_name,:username,:email)
  end

end
