Rails.application.routes.draw do
  mount_ember_app :frontend, to: "/"
  namespace :api do
    post "calculate", to: "calculator#calculate"
  end
end
