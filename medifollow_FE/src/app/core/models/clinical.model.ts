export interface VitalsData {
    id: string;
    patientId: number;
    timestamp: Date;
    temperature: number;      // Celsius
    systolicBP: number;       // mmHg
    diastolicBP: number;      // mmHg
    heartRate: number;        // bpm
    weight: number;           // kg
    source: 'MANUAL' | 'DEVICE';
}

export interface SymptomReport {
    id: string;
    patientId: number;
    timestamp: Date;
    painLevel: number;        // 0-10
    fatigueLevel: number;     // 0-10
    shortnessOfBreath: boolean;
    nausea: boolean;
    notes?: string;
}

export interface PatientRecord {
    id: number;
    userId: number; // Links to Auth User
    dateOfBirth: Date;
    assignedDoctorId: number;
    assignedUnitId: string;
    alertsCount: number;
}
