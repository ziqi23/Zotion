class Team < ApplicationRecord
    validates :team_name, presence: true

    has_many :team_users,
        foreign_key: :team_id,
        class_name: "TeamUser"

    has_many :users,
        through: :team_users,
        source: :user

end