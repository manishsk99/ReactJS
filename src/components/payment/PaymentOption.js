import { useState } from 'react';
import { PAYMENT_OPTION_LIST } from '../basic/StaticData';
import AppInput from '../sub_components/AppInput';

function PaymentOption(props) {

    function setSelectedPaymentOption(value) {
        props.setSelectedPaymentOption(value);
    }

    let [inputProps] = useState({
        payment_option: { type: "radio", name: "Payment Options", rule: "required", setFunction: setSelectedPaymentOption, items: PAYMENT_OPTION_LIST }
    });
    return (
        <div className="card mt-4 p-3">

            {Object.keys(inputProps).map((field, key) =>
                <AppInput key={key}
                    type={inputProps[field].type}
                    name={inputProps[field].name}
                    setFunction={inputProps[field].setFunction}
                    validationRule={inputProps[field].rule}
                    items={inputProps[field].items}
                    nameSuffix={inputProps[field].nameSuffix}
                />
            )
            }
        </div>
    );
}

export default PaymentOption;