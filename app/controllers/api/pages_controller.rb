class Api::PagesController < ApplicationController
    def index
        if (params[:page]) 
            @pages = current_user.pages.where("journal_id = #{params[:page]}")
        elsif (params[:team])
            @pages = current_user.pages.where("team_id = #{params[:team]}")
        else
            first_relation = current_user.pages
            # second_relation = Page.find_by(team_id: User.find_by(id: current_user.id).teams)
            @pages = first_relation#.or(second_relation)
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
        p "here"
        @page = Page.find_by(id: params[:id])
        p page_params
        # page_params.keys.each do |key|
        #     @page[key] = page_params[key]
        # end
        p @page
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
