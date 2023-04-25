@pages.each do |page|
    json.set! page.id do 
        json.extract! page, :id, :page_icon, :page_name, :favorite, :team_id, :journal_id, :html_content, :updated_at
    end
end


# {1: {id: 1, page_icon: "tree", "page_name": "tasks"...}}