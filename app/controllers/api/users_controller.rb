class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)
    if (@user.save)
      page = Page.create({user_id: @user.id, page_name: "Reading List"})
      page = Page.create({user_id: @user.id, page_name: "Tasks"})
      page = Page.create({user_id: @user.id, page_name: "Getting Started"})
      page = Page.create({user_id: @user.id, page_name: "Personal Home"})
      login!(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require('user').permit('username', 'email', 'password')
  end
end
