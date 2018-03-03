class Api::CalculatorController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :get_result

  def calculate
    respond_to do |format|
      format.json
    end
  end

  private

  def calculator_params
    params.permit(:firstOperand, :secondOperand, :operation)
  end

  def get_result
    @result = calculator.perform
  end

  def calculator
    @calculator ||= Calculator.from_params(calculator_params.to_h)
  end
end
