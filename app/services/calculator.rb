class Calculator
  include ActiveModel::Validations

  BINARY_OPERATIONS = %w[+ - * ** /]
  UNARY_OPERATIONS  = %w[sqrt]

  OPERATIONS = (UNARY_OPERATIONS + BINARY_OPERATIONS).freeze

  attr_reader :left_operand, :right_operand, :operation

  validates :operation, presence: true
  validates :operation, inclusion: { in: OPERATIONS, message: 'invalid operation' }
  validates :left_operand, presence: true
  validates :right_operand, presence: true, if: :binary_operation?

  def self.from_params(params)
    new(params[:firstOperand], params[:secondOperand], params[:operation])
  end

  def initialize(left_operand, right_operand, operation)
    @left_operand  = BigDecimal.new(left_operand) if left_operand.present?
    @right_operand = BigDecimal.new(right_operand) if right_operand.present?
    @operation     = operation
  end

  def perform
    return 'NaN' unless valid?
    return perform_unary if unary_operation?
    perform_binary
  end

  def unary_operation?
    UNARY_OPERATIONS.include?(operation)
  end

  def binary_operation?
    BINARY_OPERATIONS.include?(operation)
  end

private

  def performable_operation
    operation.to_sym
  end

  def perform_binary
    left_operand.send(performable_operation, right_operand)
  end

  def perform_unary
    left_operand.send(performable_operation, left_operand)
  end
end
