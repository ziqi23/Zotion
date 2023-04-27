class TeamUser < ApplicationRecord
  belongs_to :team,
    foreign_key: :team_id,
    class_name: 'Team'

  belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

  validates :team_id, :user_id, presence: true
end
