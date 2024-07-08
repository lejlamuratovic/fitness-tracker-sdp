export type Exercise = {
    id: string, 
    name: string,
    muscleGroup: string,
    description: string,
    imageUrl: string
}

export type ExerciseDetail = {
    detailId?: string,
    exerciseId?: string,
    exerciseName: string, 
    weight: number,
    sets: number, 
    reps: number
}

export type Routine = {
    id?: string, 
    name: string, 
    exercises?: ExerciseDetail[],
    creationDate: string,
    userId: string,
    isPrivate: boolean
}

export type User = {
    id: string, 
    userType: string,
    firstName: string, 
    lastName: string,
    email: string,
    password: string,
    creationDate: string
}

export type WorkoutLog = {
    id: string, 
    dateCompleted: string, 
    exercises: ExerciseDetail[],
    userId: string
}

export type Password = {
    oldPassword: string,
    newPassword: string
}

export type ScheduledRoutine = {
    //id?: string,
    routineId: string,
    userId: string,
    scheduledAt: string
}
