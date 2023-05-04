class Api::TeamsController < ApplicationController
    def index
        if (!params[:all])
            @teams = current_user.teams
        else
            @teams = Team.all
        end
        render :index
    end

    def create
        @team = Team.create(team_params)
        if (@team.save)
            Page.create({user_id: current_user.id, team_id: @team.id, page_name: "Teamspace Home"})
            Page.create({user_id: current_user.id, team_id: @team.id, page_name: "Wiki"})
            Page.create({user_id: current_user.id, team_id: @team.id, page_name: "Tasks"})
            Page.create({user_id: current_user.id, team_id: @team.id, page_name: "Projects"})
            TeamUser.create(user_id: current_user.id, team_id: @team.id)
            render :show
        else
            render json: {errors: @team.errors.full_messages}, status: :unprocessable_entity
        end
    end

    # def update
    #     @team = Team.find_by(id: params[:id])
    #     p team_params
    #     team_params.keys.each do |key|
            
    #         @team[key] = team_params[key]
    #     end
    #     p @team
    #     if (@team.save)
    #         render :show
    #     else
    #         render json: {errors: @team.errors.full_messages}, status: :unprocessable_entity
    #     end
    # end

    # def destroy
    #     @team = team.find_by(id: params[:id])
    #     if (@team)
    #         @team.destroy
    #         render json: {message: 'success'}
    #     else
    #         render json: {message: 'failed'}, status: :unprocessable_entity
    #     end
    # end

    # def show
    #     @team = team.find_by(id: params[:id])
    #     render :show
    # end
    
    private
    def team_params
        params.require(:team).permit(:team_name)
    end
end