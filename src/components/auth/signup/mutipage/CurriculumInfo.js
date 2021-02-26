import React from 'react'

function CurriculumInfo({ formData, setForm, navigation, handleKeyPress }) {
  const { standard, stream, giNo, prnNo, date } = formData
  
  return (
    <div className="signup__info">
      <form>
        <h4 className="text-center">Curriculum Info</h4>
        <div className="input-group">
          <span className="form-icon"><i className="far fa-address-book"></i></span>
          <input name="standard" value={standard} autoComplete="off" onChange={setForm} type="text" placeholder="Standard" />
        </div>
        <div className="input-group">
          <span className="form-icon"><i className="far fa-address-book"></i></span>
          <textarea name="stream" value={stream} autoComplete="off" rows="1" onChange={setForm} type="text" placeholder="Address" />
        </div>
        <div className="input-group">
          <span className="form-icon"><i className="far fa-address-book"></i></span>
          <input name="giNo" value={giNo} autoComplete="off" onChange={setForm} type="tel" onKeyPress={handleKeyPress} maxLength="10" placeholder="GI No." />
        </div>
        <div className="input-group">
          <span className="form-icon"><i className="far fa-address-book"></i></span>
          <input name="prnNo" value={prnNo} autoComplete="off" onChange={setForm} type="tel" onKeyPress={handleKeyPress} maxLength="16" placeholder="PRN No." />
        </div>
        <div className="input-group date__field">
          <p className="pr-1">Date</p>
          <input name="date" value={date} autoComplete="off" onChange={setForm} type="date" placeholder="Date" />
        </div>
      </form>
      <div className="btns">
        <button className="btn btn--sm" onClick={() => navigation.previous()}><i className="fas fa-arrow-left"></i> Previous</button>
        <button className="btn btn--sm btn--blue" onClick={() => navigation.next()}>Next <i className="fas fa-arrow-right"></i></button>
      </div>
    </div>
  )
}

export default CurriculumInfo
