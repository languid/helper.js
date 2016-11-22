/**
 * Created by Administrator on 2016/10/13.
 */
import _ from 'lodash';

const validator = {
    required: {
        message(){
            return 'required';
        },
        validate(val, required){
            return !required ? true :
                _.isString(val) ? !!_.trim(val) :
                    _.isArray(val) || _.isObject(val) ? _.size(val) > 0 : true;
        }
    },
    maxlength: {
        message(){
            return 'maxlength';
        },
        validate(val, num){
            return _.isString(val) && val.length <= num;
        }
    },
    minlength: {
        message(){
            return 'minlength';
        },
        validate(val, num){
            return _.isString(val) && val.length >= num;
        }
    },
    max: {
        message(){
            return 'max';
        },
        validate(val, num){
            return validator.number(val, true) && +val <= num;
        }
    },
    min: {
        message(){
            return 'min';
        },
        validate(val, num){
            return validator.number(val, true) && +val >= num;
        }
    },
    number: {
        message(){
            return 'must number';
        },
        validate(val, required){
            return !required ? true :/^\d+(\.\d+)?$/.test(val);
        }
    },
    digits: {
        message(){
            return 'must digits';
        },
        validate(val, required){
            return !required ? true : /^\d+$/.test(val);
        }
    },
    range: {
        message(condition){
            return `Must be between ${condition[0]} and ${condition[1]}`;
        },
        validate(val, range){
            return val.length >= range[0] && val.length <= range[1];
        }
    }
};

export default validator;