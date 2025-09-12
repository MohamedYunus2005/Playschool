import React, { useState, useEffect } from 'react';

const VaccinationTracker = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [vaccinationRecords, setVaccinationRecords] = useState({});
    const [vaccineSchedule, setVaccineSchedule] = useState([
        { id: 1, name: 'BCG', recommendedAge: 'At birth', doses: 1 },
        { id: 2, name: 'Hepatitis B - Birth dose', recommendedAge: 'At birth', doses: 1 },
        { id: 3, name: 'OPV - Zero dose', recommendedAge: 'At birth', doses: 1 },
        { id: 4, name: 'OPV - 1, 2 & 3', recommendedAge: '6, 10 & 14 weeks', doses: 3 },
        { id: 5, name: 'IPV', recommendedAge: '6 & 14 weeks', doses: 2 },
        { id: 6, name: 'Pentavalent - 1, 2 & 3', recommendedAge: '6, 10 & 14 weeks', doses: 3 },
        { id: 7, name: 'Rotavirus', recommendedAge: '6, 10 & 14 weeks', doses: 3 },
        { id: 8, name: 'Measles-Rubella - 1st dose', recommendedAge: '9-12 months', doses: 1 },
        { id: 9, name: 'Measles-Rubella - 2nd dose', recommendedAge: '16-24 months', doses: 1 },
        { id: 10, name: 'JE - 1st dose', recommendedAge: '9-12 months', doses: 1 },
        { id: 11, name: 'JE - 2nd dose', recommendedAge: '16-24 months', doses: 1 },
        { id: 12, name: 'DPT booster', recommendedAge: '16-24 months', doses: 1 },
        { id: 13, name: 'Polio Booster', recommendedAge: '16-24 months', doses: 1 }
    ]);

    // Load data from localStorage
    useEffect(() => {
        const savedStudents = JSON.parse(localStorage.getItem('anganwadiStudents')) || [];
        const savedVaccinations = JSON.parse(localStorage.getItem('anganwadiVaccinations')) || {};
        setStudents(savedStudents);
        setVaccinationRecords(savedVaccinations);
    }, []);

    // Save vaccination records to localStorage
    useEffect(() => {
        localStorage.setItem('anganwadiVaccinations', JSON.stringify(vaccinationRecords));
    }, [vaccinationRecords]);

    // Record a vaccination
    const recordVaccination = (vaccineId, doseNumber) => {
        if (!selectedStudent) return;

        const record = {
            vaccineId,
            doseNumber,
            date: new Date().toISOString().split('T')[0],
            administeredBy: 'Anganwadi Worker'
        };

        setVaccinationRecords(prev => {
            const newRecords = { ...prev };
            if (!newRecords[selectedStudent]) {
                newRecords[selectedStudent] = [];
            }
            newRecords[selectedStudent].push(record);
            return newRecords;
        });
    };

    // Check if a vaccine dose has been administered
    const isVaccineAdministered = (vaccineId, doseNumber) => {
        if (!selectedStudent || !vaccinationRecords[selectedStudent]) return false;
        return vaccinationRecords[selectedStudent].some(record =>
            record.vaccineId === vaccineId && record.doseNumber === doseNumber
        );
    };

    // Get due vaccinations for selected student
    const getDueVaccinations = () => {
        if (!selectedStudent) return [];

        const studentRecords = vaccinationRecords[selectedStudent] || [];
        const dueVaccines = [];

        vaccineSchedule.forEach(vaccine => {
            for (let dose = 1; dose <= vaccine.doses; dose++) {
                const isAdministered = studentRecords.some(record =>
                    record.vaccineId === vaccine.id && record.doseNumber === dose
                );

                if (!isAdministered) {
                    dueVaccines.push({
                        ...vaccine,
                        doseNumber: dose,
                        status: 'Due'
                    });
                    break; // Only show the next due dose
                }
            }
        });

        return dueVaccines;
    };

    // Send notification (simulated)
    const sendNotification = (vaccineName, doseNumber) => {
        alert(`📧 Notification would be sent to parents for ${vaccineName} (Dose ${doseNumber})!\n\nIn production, this would send an SMS/Email.`);
    };

    const dueVaccinations = getDueVaccinations();
    const studentRecords = selectedStudent ? vaccinationRecords[selectedStudent] || [] : [];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Vaccination Tracker</h1>

            {/* Student Selection */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Select Child</h2>
                <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                >
                    <option value="">Choose a child</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedStudent && (
                <>
                    {/* Due Vaccinations */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">Due Vaccinations</h2>
                        {dueVaccinations.length === 0 ? (
                            <p className="text-green-600">🎉 All vaccinations are up to date!</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {dueVaccinations.map(vaccine => (
                                    <div key={`${vaccine.id}-${vaccine.doseNumber}`} className="border border-yellow-300 bg-yellow-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-yellow-800">{vaccine.name} (Dose {vaccine.doseNumber})</h3>
                                        <p className="text-sm text-yellow-600">Recommended: {vaccine.recommendedAge}</p>
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                onClick={() => recordVaccination(vaccine.id, vaccine.doseNumber)}
                                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                            >
                                                Mark as Administered
                                            </button>
                                            <button
                                                onClick={() => sendNotification(vaccine.name, vaccine.doseNumber)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                            >
                                                Remind Parents
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Vaccination History */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Vaccination History</h2>
                        {studentRecords.length === 0 ? (
                            <p className="text-gray-600">No vaccination records found.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2 text-left">Date</th>
                                            <th className="px-4 py-2 text-left">Vaccine</th>
                                            <th className="px-4 py-2 text-left">Dose</th>
                                            <th className="px-4 py-2 text-left">Administered By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentRecords.map((record, index) => {
                                            const vaccine = vaccineSchedule.find(v => v.id === record.vaccineId);
                                            return (
                                                <tr key={index} className="border-b">
                                                    <td className="px-4 py-2">{new Date(record.date).toLocaleDateString('en-IN')}</td>
                                                    <td className="px-4 py-2">{vaccine?.name || 'Unknown Vaccine'}</td>
                                                    <td className="px-4 py-2">{record.doseNumber}</td>
                                                    <td className="px-4 py-2">{record.administeredBy}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Vaccine Schedule Reference */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-semibold mb-4">Vaccination Schedule Reference</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-green-100">
                                <th className="px-4 py-2 text-left">Vaccine</th>
                                <th className="px-4 py-2 text-left">Recommended Age</th>
                                <th className="px-4 py-2 text-left">Doses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vaccineSchedule.map(vaccine => (
                                <tr key={vaccine.id} className="border-b">
                                    <td className="px-4 py-2">{vaccine.name}</td>
                                    <td className="px-4 py-2">{vaccine.recommendedAge}</td>
                                    <td className="px-4 py-2">{vaccine.doses}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VaccinationTracker;