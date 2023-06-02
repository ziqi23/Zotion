# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    TeamUser.destroy_all
    User.destroy_all
    Page.destroy_all
    Team.destroy_all
    
    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    User.create!(
      username: 'Ziqi', 
      email: 'ziqi@gmail.com', 
      password: '123456'
    )

    puts "Creating teamspaces..."
    Team.create!(
      team_name: 'App Academy'
    )

    Team.create!(
      team_name: 'Google Campus'
    )

    Team.create!(
      team_name: 'University Center'
    )

    Team.create!(
      team_name: 'ABC Group'
    )
  
    puts "Done!"
  end