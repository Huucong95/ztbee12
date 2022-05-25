import ServiceSubject from "./service_subject";
interface ServiceObserver {
    update(serviceSubject: ServiceSubject): void;
}
export default ServiceObserver;
