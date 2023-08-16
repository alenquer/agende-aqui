export interface IServiceMetadata {
	id: string;
	name: string;
	description: string;
	price: string;
	duration: string;
	professional: string;
	schedules?: IScheduleProps[];
	availability: string[];
}

export interface IScheduleProps {
	id?: string;
	serviceId?: string;
	date: string;
	time: string;
	status: string;
}
