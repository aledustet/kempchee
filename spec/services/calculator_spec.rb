require 'rails_helper'

RSpec.describe Calculator do
  let(:subject)      { described_class.new('4', '4', '+') }
  let(:invalid_unary_operation) { { operation: 'sqrt' } }
  let(:valid_unary_operation) { { operation: 'sqrt', firstOperand: '4' } }
  let(:invalid_binary_operation) { { operation: '+', firstOperand: '4' } }
  let(:invalid_operands) { { operation: 'not valid' } }

  describe 'validations' do
    context 'on an operation that is on the permited collection' do
      it 'is valid' do
        expect(subject).to be_valid
      end

      context 'on an unary operation' do
        context 'with at least the first operand' do
          it 'is valid' do
            expect(described_class.from_params(valid_unary_operation)).to be_valid
          end
        end

        context 'without the first operand' do
          it 'is invalid' do
            expect(described_class.from_params(invalid_unary_operation)).not_to be_valid
          end
        end
      end

      context 'on an binary operation' do
        context 'without both operands' do
          it 'is invalid' do
            expect(described_class.from_params(invalid_binary_operation)).not_to be_valid
          end
        end
      end
    end

    context 'on an operation that is not on the valid collection' do
      it 'is invalid' do
        expect(described_class.from_params(invalid_operands)).not_to be_valid
      end
    end
  end

  describe 'initialize' do
    it 'sets the instance variables properly' do
      expect(subject.left_operand).to eq BigDecimal.new('4')
      expect(subject.right_operand).to eq BigDecimal.new('4')
      expect(subject.operation).to eq '+'
    end
  end

  describe '#perform' do
    after { subject.perform }

    context 'on an unary operation' do
      let(:subject) { described_class.new('4', nil, 'sqrt') }

      it 'performs an unary operation on the left operand' do
        expect(subject).to receive(:perform_unary)
      end
    end

    context 'on a binary operation' do
      it 'performs the operation on the two values' do
        expect(subject).to receive(:perform_binary)
      end
    end
  end

  describe 'valid operations' do
    OPERATIONS = {
      '+'    => BigDecimal.new('8'),
      '-'    => BigDecimal.new('0'),
      '*'    => BigDecimal.new('16'),
      '**'   => BigDecimal.new('256'),
      '/'    => BigDecimal.new('1'),
      'sqrt' => BigDecimal.new('2')
    }

    OPERATIONS.each do |operation, result|
      it "performs the #{operation} on both operands" do
        calculator = described_class.new('4', '4', operation)
        expect(calculator.perform).to eq result
      end
    end
  end
end
