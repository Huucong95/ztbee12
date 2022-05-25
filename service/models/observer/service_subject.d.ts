import ServiceObserver from "./service_observer";
interface ServiceSubject {
    attach(serviceObserver: ServiceObserver): void;
    detach(serviceObserver: ServiceObserver): void;
    notify(serviceObserver: ServiceObserver): void;
}
export default ServiceSubject;
