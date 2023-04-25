class Api::PagesController < ApplicationController
    def index
        if (params[:page]) 
            @pages = current_user.pages.where("journal_id = #{params[:page]}")
        else
            @pages = current_user.pages
        end
        render :index
    end

    def create
        if (page_params[:journal_id])
            @page = Page.create(user_id: current_user.id, journal_id: page_params[:journal_id])
        else
            @page = Page.create(user_id: current_user.id)
        end
        render :show
    end

    def update
        @page = Page.find_by(id: params[:id])
        page_params.keys.each do |key|
            @page[key] = page_params[key]
        end
        if (@page.save)
            render :show
        else
            render json: {errors: @page.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        @page = Page.find_by(id: params[:id])
        if (@page)
            @page.destroy
            render json: {message: 'success'}
        else
            render json: {message: 'failed'}, status: :unprocessable_entity
        end
    end

    def show
        @page = Page.find_by(id: params[:id])
        render :show
    end
    
    private
    def page_params
        params.require('page').permit('page_icon', 'page_name', 'favorite', 'html_content', 'team_id', 'journal_id')
    end
end
