class Api::SessionsController < ApplicationController
  def show
    @current_user = current_user
    if (@current_user)
      render json: {user: @current_user}
    else
      render json: {user: nil}
    end
  end

  def create
    credential = params[:credential]
    password = params[:password]
    @user = User.find_by_credentials(credential, password)
    if (@user)
      login!(@user)
      render json: {user: @user}
    else
      render json: {errors: ['The provided credentials were invalid.'], status: :unauthorized}
    end
  end

  def destroy
    if (current_user)
      logout!
      render json: {message: 'success'}
    end
  end
end
