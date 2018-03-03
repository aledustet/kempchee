require 'rails_helper'

RSpec.describe Api::CalculatorController do
  let(:params) { { 'firstOperand'=>'2', 'secondOperand'=>'2', 'operation'=>'+' } }

  it 'creates a new instance of the calculator service' do
    expect(Calculator).to receive(:from_params).with(params).and_call_original
    post 'calculate', params: params, format: :json
  end

  it 'renders the result of the calculator performance' do
    post 'calculate', params: params, format: :json

    expect(response.content_type).to eq 'application/json'
    expect(response).to have_http_status :ok
    expect(response.body).to eq({ result: BigDecimal.new(4) }.to_json)
  end
end
