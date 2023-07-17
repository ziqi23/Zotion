class UpdateNullConstraint < ActiveRecord::Migration[7.0]
  def change
    change_column_null :pages, :user_id, true
  end
end
