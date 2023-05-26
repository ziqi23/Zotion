class Api::PagesController < ApplicationController
    def index
        if (params[:page]) 
            @pages = current_user&.pages.where("journal_id = #{params[:page]}")
        elsif (params[:team])
            @pages = Page.where("team_id = #{params[:team]}")
        else
            first_relation = current_user.pages
            second_relation = Page.where(team_id: current_user.teams.ids)
            @pages = first_relation.or(second_relation)
        end
        render :index
    end

    def create
        if (page_params[:journal_id])
            @page = Page.create(user_id: current_user.id, journal_id: page_params[:journal_id])
        elsif (page_params[:team_id])
            @page = Page.create(user_id: current_user.id, team_id: page_params[:team_id])
        else
            @page = Page.create(user_id: current_user.id)
        end
        render :show
    end

    def update
        @page = Page.find_by(id: params[:id])
        if (@page.update(page_params))
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
        params.require(:page).permit(:page_icon, :page_name, :favorite, :team_id, :journal_id, { :html_content => [:type, :text, { :styles => [:bold, :italic, :underline] }] })
    end
end
