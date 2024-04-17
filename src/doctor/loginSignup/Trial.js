function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("IN app.js", isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otpverification" element={<OtpVerification />} />
        <Route
          path="/otpforgotverification"
          element={<OtpForgotVerification />}
        />
        <Route path="/forgotemail" element={<ForgotEmail />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <PrivateRoute path="/" element={<Navigation />} isAuthenticated={isAuthenticated}>
          <Route index element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/doctorprofile" element={<DoctorProfile />} />
          <Route path="/rota" element={<Rota />} />
          <Route path="/prescription" element={<Prescription />} />
        </PrivateRoute>
      </Routes>
    </BrowserRouter>
  );
}

// PrivateRoute component to handle authentication logic
const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  const WrappedNavigation = withCollapseState(Navigation);
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("IN app.js", isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otpverification" element={<OtpVerification />} />
        <Route
          path="/otpforgotverification"
          element={<OtpForgotVerification />}
        />
        <Route path="/forgotemail" element={<ForgotEmail />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Public routes accessible to all */}
        <Route path="/" element={<WrappedNavigation />}>
          {/* Private routes accessible only when authenticated */}
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            element={<Dashboard />}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/home"
            element={<Home />}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/doctorprofile"
            element={<DoctorProfile />}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/rota"
            element={<Rota />}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/prescription"
            element={<Prescription />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : element;
};

function App() {
  const WrappedNavigation = withCollapseState(Navigation);

  return (
    <BrowserRouter>
      <Routes>
        <PublicRoute path="/login" element={<Login />} />
        <PublicRoute path="/signup" element={<Signup />} />
        <PublicRoute path="/otpverification" element={<OtpVerification />} />
        <PublicRoute
          path="/otpforgotverification"
          element={<OtpForgotVerification />}
        />
        <PublicRoute path="/forgotemail" element={<ForgotEmail />} />
        <PublicRoute path="/forgotpassword" element={<ForgotPassword />} />

        <Route path="/" element={<WrappedNavigation />}>
          <PrivateRoute element={<Dashboard />} />
          <PrivateRoute path="/home" element={<Home />} />
          <PrivateRoute path="/doctorprofile" element={<DoctorProfile />} />
          <PrivateRoute path="/rota" element={<Rota />} />
          <PrivateRoute path="/prescription" element={<Prescription />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}




<Routes>
  {/* Public Routes */}
  {!isAuthenticated && <Route path="/login" element={<Login />} />}
  {!isAuthenticated && <Route path="/signup" element={<Signup />} />}
  {!isAuthenticated && <Route path="/otpverification" element={<OtpVerification />} />}
  {!isAuthenticated && <Route path="/otpforgotverification" element={<OtpForgotVerification />} />}
  {!isAuthenticated && <Route path="/forgotemail" element={<ForgotEmail />} />}
  {!isAuthenticated && <Route path="/forgotpassword" element={<ForgotPassword />} />}

  {/* Private Routes */}
  {isAuthenticated && (
    <>
      <Route path="/" element={<WrappedNavigation />}>
        <Route index element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctorprofile" element={<DoctorProfile />} />
        <Route path="/rota" element={<Rota />} />
        <Route path="/prescription" element={<Prescription />} />
      </Route>
    </>
  )}
</Routes>





{/* <Routes> */ }


{/* {isAuthenticated ? (
): (

  )} */}
{/* <Route path="/login" element={<Login />} />
<Route path="/" element={<WrappedNavigation />}>
  <Route index element={<Dashboard />} />
  <Route path="/doctorprofile" element={<DoctorProfile />} />
  <Route path="/rota" element={<Rota />} />
  <Route path="/prescription" element={<Prescription />} />
</Route>

<Route path='/signup' element={<Signup />} />
<Route path='/otpverification' element={<OtpVerification />} />
<Route path='/otpforgotverification' element={<OtpForgotVerification />} />
<Route path='/forgotemail' element={<ForgotEmail />} />
<Route path='/forgotpassword' element={<ForgotPassword />} />



</Routes> */}



import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import * as moment from 'moment'
import { Button, Modal, Form, Input, Select, Layout, Tabs, DatePicker, TimePicker, message } from 'antd';
import { getRotaSlotsApi, getRotadateApi, rotaApi } from '../reducer/RotaReducer';
import { useParams } from 'react-router';
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select

function Rota() {

  const { addRota } = useSelector((state) => state.newRota);
  const dispatch = useDispatch();

  const { id } = useParams();
  console.log("Your id is--", id);

  console.log("My Your add rota is--", addRota);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const slots = {
    rota_date: "",
    rota_time: "",
    duration: '',
    price: '',
  }

  const [createRota, setRota] = useState(slots);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);


  useEffect(() => {

    dispatch(getRotadateApi(id))
    dispatch(getRotaSlotsApi(id))

  }, [dispatch, id])


  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleOk = () => {

    form
      .validateFields()
      .then(values => {
        // console.log('Received values:', values);

        // addRota(values);
        let startDate = values.rota_date[0];
        let endDate = values.rota_date[1];
        let startTime = values.rota_time[0].format();
        let endTime = values.rota_time[1].format();
        let for_date = startDate.format("DD-MM-YYYY") + "," + endDate.format("DD-MM-YYYY");

        console.log("For date is--", for_date);
        console.log("start Time is---", startTime)
        console.log("End Time is---", endTime)

        const duration = parseInt(values.duration);

        const sendRotaData = {
          startTime: startTime,
          endTime: endTime,
          for_date: for_date,
          duration: duration,
          price: parseInt(values.price),
        }

        console.log("Send Rota data-:", sendRotaData);
        dispatch(rotaApi(sendRotaData))


        console.log("Duration is---", duration);

        const dateDiff1 = endDate.diff(startDate, 'days') + 1;
        console.log("date-diff1", dateDiff1);

        const dates = [];
        for (let i = 0; i < dateDiff1; i++) {
          dates.push(startDate.clone().add(i, 'days'));
          console.log("date obj", dates, i);
        }

        setSelectedDates(dates);

        const totalMinutes = dayjs(endTime).diff(startTime, 'minutes');
        console.log("Total minutes: " + totalMinutes);

        const numSlots = Math.ceil(totalMinutes / duration);
        console.log("numSlots", numSlots);

        const timeSlots = [];
        let currentSlotStart = startTime.clone();
        for (let i = 0; i < numSlots; i++) {

          const currentSlotEnd = currentSlotStart.clone().add(duration, 'minutes');
          console.log("CurrentSlotEnd", currentSlotEnd);

          timeSlots.push([currentSlotStart.format('HH:mm'), currentSlotEnd.format('HH:mm')]);
          currentSlotStart = currentSlotEnd;

          console.log("CurrentSlot start--", currentSlotStart);
          console.log("CurrentSlot End--", currentSlotEnd);

        }

        console.log('Time Slots:', timeSlots);

        // if (dateDiff > 365 || timeDiff > 87) {
        //     message.error("The selected time period is too large.");
        //     return false;
        // } else {
        //     setState({...state, rota_dates: diff_range, rota_times: time_range})
        //     setIsModalOpen(false);
        // }



        // if (dateDiff > 0 && timeDiff > 0) {

        // }
        // else {
        //     alert("Please select valid date and time")
        // }





        // dispatch(addRota(action.payload))

        // Generate time slots
        // const timeSlots1 = generateTimeSlots(startDate, endDate, startTime, endTime, duration);
        setTimeSlots(timeSlots1);
        setRota({
          // ...createRota,
          start_date: values.rota_date[0],
          end_date: values.rota_date[1],
          start_time: values.rota_time[0],
          end_time: values.rota_time[1],
          duration: values.duration,
          price: values.price,
          diff_range: selectedDates,
          timeSlots: timeSlots
        });

        console.log("SetRota", createRota);


        // setDataTable([...dataTable, values]);

        setIsModalOpen(false);
        form.resetFields();

        // console.log('Form values after reset:', form.getFieldsValue());
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      })

  };



  const handleCancel = () => {
    setIsModalOpen(false);

  };


  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const handleFormChange = (changedValues, allValues) => {
    // console.log(changedValues);
    setRota(allValues)
  };



  //Patient option list
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  return (
    <>
      <Content className='p-2 m-[82px_10px_0px_14px]'>
        <p className='text-[0.9rem] mb-3 font-bold'>Rota</p>
        <div className='bg-white py-5 flex justify-end rounded-md'>
          <Button type="" onClick={showModal} className='bg-rblue mr-5 text-white text-[0.8rem] focus-within:bg-rblue font-bold px-5 py-1 flex align-center'>
            <span>Add Rota</span>
          </Button>
          <Modal title="Add Rota" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ top: 20 }} maskClosable={false} okText="Submit">
            <Form
              form={form}
              layout='vertical'
              className='prescription_form'
              name="prescriptionForm"
              initialValues={createRota}
              onValuesChange={handleFormChange}
            >
              <Form.Item
                name="rota_date"
                label='Select Rota Date'

                rules={[{
                  required: true,
                  message: 'Please enter rota date !'
                }]}
              >

                <RangePicker disabledDate={disabledDate}
                  format={"DD-MM-YYYY"}
                  // onChange={(value) => {
                  //     setRota((prevState) => ({
                  //         ...prevState,
                  //         rota_start_time: value[0],
                  //         rota_end_time: value[1]
                  //     }))

                  // }} 
                  className="w-full"
                />

              </Form.Item>
              <Form.Item
                name="rota_time"
                label="Select Rota Time"
                rules={[
                  {
                    required: true,
                    message: 'Please enter rota time !'
                  }
                ]}
              >
                <TimePicker.RangePicker
                  minuteStep={30}
                  format="HH:mm"
                  className="w-full ok_btn"
                />

              </Form.Item>

              <div className='flex gap-5'>

                <Form.Item
                  name="duration"
                  label='Select Duration'

                  rules={[{
                    required: true,
                    message: 'Please enter duration !'
                  }]}
                >
                  <Select onChange={(value) => {
                    setRota((prevState) => ({
                      ...prevState,
                      duration: value,
                    }))

                  }}
                    style={{ width: "14.5rem" }}    >
                    <Option value="30">30 Min</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="price"
                  label='Price'

                  rules={[{
                    required: true,
                    message: 'Please enter price !'
                  }]}
                  style={{ width: "14.5rem" }}
                >
                  <Input />

                </Form.Item>

              </div>


            </Form>
          </Modal>
        </div>


        {
          addRota?.length <= 0 ? (<p>No Slots</p>) : (
            <div className='mt-10 bg-white p-10 rounded-lg overflow-uto'>
              <Tabs defaultActiveKey="1" tabPosition="top">
                {addRota.available_date.map((date, index) => (
                  <Tabs.TabPane key={index + 1}>
                    <div className='grid grid-cols-8 gap-7 overflow-y-scroll max-h-72 py-3 px-2'>
                      {timeSlots.map((slot, slotIndex) => {
                        if (slot.date === date.format('YYYY-MM-DD')) {
                          return (
                            <Button key={slotIndex} className='flex align-center gap-1 justify-center'>
                              {slot.start} - {slot.end}
                            </Button>
                          );
                        }
                      })}
                    </div>
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </div>
          )
        }


      </Content >
    </>
  )
}
export default :





import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import noDataFoundImg from "../img/no_data_found1.png"
import * as moment from 'moment'
import { Button, Modal, Form, Input, Select, Layout, Tabs, DatePicker, TimePicker, message } from 'antd';
import { getRotaSlotsApi, getRotadateApi, rotaApi } from '../reducer/RotaReducer';
import { useParams } from 'react-router';
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select

function Rota() {

  const { addRota } = useSelector((state) => state.newRota);
  const dispatch = useDispatch();

  const { id } = useParams();
  console.log("Your id is--", id);

  console.log("My Your add rota is--", addRota);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const slots = {
    rota_date: "",
    rota_time: "",
    duration: '',
    price: '',
  }

  const [createRota, setRota] = useState(slots);
  // const [timeSlots, setTimeSlots] = useState([]);
  // const [selectedDates, setSelectedDates] = useState([]);


  useEffect(() => {

    dispatch(getRotadateApi(id))
    dispatch(getRotaSlotsApi(id))

  }, [dispatch, id])


  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleOk = () => {

    form
      .validateFields()
      .then(values => {
        // console.log('Received values:', values);

        // addRota(values);
        let startDate = values.rota_date[0];
        let endDate = values.rota_date[1];
        let startTime = values.rota_time[0].format();
        let endTime = values.rota_time[1].format();
        let for_date = startDate.format("DD-MM-YYYY") + "," + endDate.format("DD-MM-YYYY");

        console.log("For date is--", for_date);
        console.log("start Time is---", startTime)
        console.log("End Time is---", endTime)

        const duration = parseInt(values.duration);

        const sendRotaData = {
          startTime: startTime,
          endTime: endTime,
          for_date: for_date,
          duration: duration,
          price: parseInt(values.price),
        }

        console.log("Send Rota data-:", sendRotaData);
        dispatch(rotaApi(sendRotaData))

        setIsModalOpen(false);
        form.resetFields();

        // console.log('Form values after reset:', form.getFieldsValue());
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      })

  };



  const handleCancel = () => {
    setIsModalOpen(false);

  };


  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const handleFormChange = (changedValues, allValues) => {
    // console.log(changedValues);
    setRota(allValues)
  };



  //Patient option list
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  return (
    <>
      <Content className='p-2 m-[82px_10px_0px_14px]'>
        <p className='text-[0.9rem] mb-3 font-bold'>Rota</p>
        <div className='bg-white py-5 flex justify-end rounded-md'>
          <Button type="" onClick={showModal} className='bg-rblue mr-5 text-white text-[0.8rem] focus-within:bg-rblue font-bold px-5 py-1 flex align-center'>
            <span>Add Rota</span>
          </Button>
          <Modal title="Add Rota" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ top: 20 }} maskClosable={false} okText="Submit">
            <Form
              form={form}
              layout='vertical'
              className='prescription_form'
              name="prescriptionForm"
              initialValues={createRota}
              onValuesChange={handleFormChange}
            >
              <Form.Item
                name="rota_date"
                label='Select Rota Date'

                rules={[{
                  required: true,
                  message: 'Please enter rota date !'
                }]}
              >

                <RangePicker disabledDate={disabledDate}
                  format={"DD-MM-YYYY"}
                  // onChange={(value) => {
                  //     setRota((prevState) => ({
                  //         ...prevState,
                  //         rota_start_time: value[0],
                  //         rota_end_time: value[1]
                  //     }))

                  // }} 
                  className="w-full"
                />

              </Form.Item>
              <Form.Item
                name="rota_time"
                label="Select Rota Time"
                rules={[
                  {
                    required: true,
                    message: 'Please enter rota time !'
                  }
                ]}
              >
                <TimePicker.RangePicker
                  minuteStep={30}
                  format="HH:mm"
                  className="w-full ok_btn"
                />

              </Form.Item>

              <div className='flex gap-5'>

                <Form.Item
                  name="duration"
                  label='Select Duration'

                  rules={[{
                    required: true,
                    message: 'Please enter duration !'
                  }]}
                >
                  <Select onChange={(value) => {
                    setRota((prevState) => ({
                      ...prevState,
                      duration: value,
                    }))

                  }}
                    style={{ width: "14.5rem" }}    >
                    <Option value="30">30 Min</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="price"
                  label='Price'

                  rules={[{
                    required: true,
                    message: 'Please enter price !'
                  }]}
                  style={{ width: "14.5rem" }}
                >
                  <Input />

                </Form.Item>

              </div>


            </Form>
          </Modal>
        </div>


        {
          addRota?.available_date?.length <= 0 ? (
            <>
              <div className='bg-white shadow-myshaow mt-10 text-center p-16 rounded-md'>
                <img src={noDataFoundImg} alt="" className='w-72 h-full m-auto' />
              </div>
            </>
          ) : (
            <div className='mt-10 bg-white p-10 rounded-lg overflow-uto'>
              <Tabs defaultActiveKey="1" tabPosition="top">
                {addRota.available_date.map((date, index) => (
                  <Tabs.TabPane key={date.date_id} tab={date.date}>
                    <div className='grid grid-cols-8 gap-7 overflow-y-scroll max-h-72 py-3 px-2'>
                      {addRota?.available_slots?.map((slot, slotIndex) => (
                        slot.doctor_availability_id === date.date_id ? (
                          <Button key={slotIndex} className='flex align-center gap-1 justify-center'>
                            {dayjs(slot.start_time).format('HH:mm')} - {dayjs(slot.end_time).format('HH:mm')}
                          </Button>
                        ) : <p>No SLOTS</p>
                      ))}
                    </div>
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </div>
          )
        }


      </Content >
    </>
  )
}
export default Rota;


{
  Array.isArray(addRota.available_slots) && addRota?.available_slots.length > 0 ? (
    addRota?.available_slots
      .map((slot, slotIndex) => {
        console.log(slot)
        Array.isArray(slot) && slot?.map((singleSlot, singleIndex) => {
          return (
            <Button key={singleIndex} className='flex align-center gap-1 justify-center'>
              {moment(singleSlot.start_time, 'YYYY-MM-DD,HH:mm').format('HH:mm')} - {moment(singleSlot.end_time, 'YYYY-MM-DD,HH:mm').format('HH:mm')}
            </Button>
          )
        })

      })
  ) : (
  <>
    <div>
      <img src={noDataFoundImg} alt="" className='w-96 h-full m-auto' />

    </div>
    {/* <p>No Slots Available</p> */}
  </>
)
}