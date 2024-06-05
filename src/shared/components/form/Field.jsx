import React, { useState } from 'react';
import propTypes from 'prop-types';
import 'styles/components/field.scss';

function Field({ name, placeholder, className, fullWidth, type, wordsCounter }) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputWords, setInputWords] = useState(0);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleWordsChange = e => {
    setInputWords(e.target.value.length);
  };

  return (
    <>
      {type === 'password' && (
        <div className="field-form-group my-2" style={{ maxWidth: fullWidth ? '100%' : '400px' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name={name}
            className={`custom-password-field ${className}`}
            placeholder={placeholder}
            style={{ borderColor: '#e3d6d1' }}
          />

          {showPassword ? (
            <button
              type="button"
              className="show-hide-icon show-hide-text text-muted bg-transparent border-0"
              onClick={handleShowPassword}
            >
              Hide
            </button>
          ) : (
            <button
              type="button"
              className="show-hide-icon show-hide-text text-muted bg-transparent border-0"
              onClick={handleShowPassword}
            >
              Show
            </button>
          )}
        </div>
      )}

      {type === 'text' && (
        <div className="field-form-group my-2" style={{ maxWidth: fullWidth ? '100%' : '400px' }}>
          <input
            type={type}
            name={name}
            className={`custom-text-field w-100 ${className}`}
            placeholder={placeholder}
            style={{ borderColor: '#e3d6d1' }}
            onChange={handleWordsChange}
          />
          <div className="d-flex align-items-center justify-content-between mt-1">
            {wordsCounter && (
              <span
                className="words-counter flex-grow-1 text-end"
                style={{ fontSize: '10px', fontFamily: 'Poppins, sans-serif' }}
              >
                {`${inputWords}/30 character`}
              </span>
            )}
          </div>
        </div>
      )}

      {type === 'textarea' && (
        <div className="field-form-group my-2" style={{ maxWidth: fullWidth ? '100%' : '400px' }}>
          <textarea
            type={type}
            name={name}
            className={`custom-text-field w-100 p-2 ${className}`}
            placeholder={placeholder}
            style={{ borderColor: '#e3d6d1' }}
            onChange={handleWordsChange}
            rows={6}
          />
          <div className="d-flex align-items-center justify-content-between mt-1">
            {wordsCounter && (
              <span
                className="words-counter flex-grow-1 text-end"
                style={{ fontSize: '10px', fontFamily: 'Poppins, sans-serif' }}
              >
                {`Max ${1000 - inputWords} words`}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}

Field.propTypes = {
  name: propTypes.string,
  placeholder: propTypes.string,
  className: propTypes.string,
  fullWidth: propTypes.bool,
  type: propTypes.string,
  wordsCounter: propTypes.bool,
};

Field.defaultProps = {
  name: '',
  placeholder: '',
  className: '',
  fullWidth: false,
  type: '',
  wordsCounter: false,
};

export default Field;
