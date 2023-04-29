class UpdateHtmlContentToArray < ActiveRecord::Migration[7.0]
  def change
    change_column :pages, :html_content, "varchar[] USING (string_to_array(html_content, ','))"
  end
end
