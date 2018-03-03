class Api::CalculatorController < ActionController::Base
  protect_from_forgery with: :exception

  def calculate
    respond_to do |format|
      format.json { render body: { result: 'ok' } }
    end
  end
end
