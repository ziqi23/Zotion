class ChangePagesTable < ActiveRecord::Migration[7.0]
  def change
    change_table :pages do |t|
      t.references :user, null: false, default: 19, foreign_key: {to_table: :users}
    end
    remove_foreign_key :pages, column: :journal_id
  end
end
