
// const generateTimeSlots = (startDate, endDate, startTime, endTime, duration) => {
//     const slots = [];
//     let currentDate = dayjs(startDate);
//     const endDateTime = dayjs(endDate).endOf('day');


//     while (currentDate.isBefore(endDateTime, 'day') || currentDate.isSame(endDateTime, 'day')) {
//         let currentSlotStart = currentDate.set('hour', startTime.hour()).set('minute', startTime.minute());
//         const endDateTime = currentDate.set('hour', endTime.hour()).set('minute', endTime.minute());

//         // console.log("print--currentSlotStart", currentSlotStart);
//         // console.log("print--endDateTime", endDateTime);

//         while (currentSlotStart.isBefore(endDateTime)) {
//             const currentSlotEnd = currentSlotStart.add(duration, 'minutes');
//             slots.push({
//                 date: currentSlotStart.format('YYYY-MM-DD'),
//                 start: currentSlotStart.format('HH:mm'),
//                 end: currentSlotEnd.format('HH:mm')
//             });
//             currentSlotStart = currentSlotEnd;
//         }
//         currentDate = currentDate.add(1, 'day').startOf('day');
//     }

//     return slots;
// };
