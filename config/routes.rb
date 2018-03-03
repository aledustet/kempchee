Rails.application.routes.draw do
  mount_ember_app :frontend, to: "/"
  namespace :api do
    get "calculator", to: "calculator#calculate"
  end
end
