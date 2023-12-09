"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = exports.OrderState = exports.CardType = void 0;
exports.CardType = {
    VISA: "visa",
    MASTERCARD: "master_card",
    AMEX: "AMEX",
    OTHER: "other",
};
exports.OrderState = {
    ALREADY_DELIVERED: "ALREADY_DELIVERED",
    NOT_ASSIGNED: "NOT_ASSIGNED",
    NOT_ACCEPTED: "NOT_ACCEPTED",
    NOT_STARTED_YET: "NOT_STARTED_YET",
    STARTED: "STARTED",
    PICKED_UP: "PICKED_UP",
    READY_TO_DELIVER: "READY_TO_DELIVER",
    FAILED_DELIVERY: "FAILED_DELIVERY",
    ACTIVE: "ACTIVE",
    INCOMPLETE: "INCOMPLETE",
};
exports.PaymentMethod = {
    CASH: "cash",
    CREDIT_CARD: "credit_card",
};
