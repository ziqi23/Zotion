class Api::TeamsController < ApplicationController
    def index
        if (!params[:all])
            @teams = current_user.teams
        else
            existing_team_ids = TeamUser.where(user_id: current_user.id).pluck(:team_id)
            if (existing_team_ids.length == 0)
                @teams = Team.all
            else 
                @teams = Team.where('id NOT IN (?)', existing_team_ids)
            end
        end
        render :index
    end

    def create
        @team = Team.create(team_params)
        if (@team.save)
            Page.create({team_id: @team.id, page_name: "Teamspace Home"})
            Page.create({team_id: @team.id, page_name: "Wiki"})
            Page.create({team_id: @team.id, page_name: "Tasks"})
            Page.create({team_id: @team.id, page_name: "Projects"})
            TeamUser.create(user_id: current_user.id, team_id: @team.id)
            render :show
        else
            render json: {errors: @team.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        team = Team.find_by(id: params[:id])
        TeamUser.create(user_id: current_user.id, team_id: team.id)

        @teams = current_user.teams
        render :index
    end

    def leave
        team = Team.find_by(id: params[:id])
        TeamUser.find_by(user_id: current_user.id, team_id: team.id)&.destroy
        @teams = current_user.teams
        render :index
    end

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