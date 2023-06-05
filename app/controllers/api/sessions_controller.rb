class Api::SessionsController < ApplicationController
  def show
    @user = current_user
    if (@user)
      render "api/users/show"
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
      render "api/users/show"
    else
      render json: {errors: ['The provided credentials were invalid.']}, status: :unauthorized
    end
  end

  def update
    @user = current_user
    if (current_user.update(strong_params))
      render "api/users/show"
    else
      render json: {errors: ['The provided credentials were invalid.']}, status: :unauthorized
    end
  end

  def destroy
    if (current_user)
      logout!
      render json: {message: 'success'}
    end
  end

  private
  def strong_params 
    params.require('session').permit('email', 'password')
  end
end
