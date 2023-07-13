export default class Driver {

    private readonly id?: string;

    private readonly name: string;

    private readonly lastName: string;

    private readonly phoneNumber: string;

    private readonly driverLicense: string;

    private readonly status: string;


    constructor(
        name: string,
        lastName: string,
        phoneNumber: string,
        driverLicense: string,
        id?: string,
        status?:string
    ) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.driverLicense = driverLicense;
        this.status = status;
    }

}