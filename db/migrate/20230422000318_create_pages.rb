class CreatePages < ActiveRecord::Migration[7.0]
  def change
    create_table :teams do |t|
      t.string :team_name, null:false

      t.timestamps
    end

    create_table :pages do |t|
      t.string :page_icon, null: false
      t.string :page_name, null: false
      t.references :journal, foreign_key: {to_table: :users}
      t.string :html_content
      t.boolean :favorite, null:false
      t.references :team, foreign_key: {to_table: :teams}

      t.timestamps
    end
  end
end
