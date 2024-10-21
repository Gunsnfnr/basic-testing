// Uncomment the code below and write your tests
import { random } from 'lodash';
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const myTestAccount = new BankAccount(100);
const secondTestAccount = new BankAccount(200);
jest.mock('lodash', () => {
  return {
    random: jest.fn(),
  };
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => myTestAccount.withdraw(101)).toThrow(
      new InsufficientFundsError(100),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => myTestAccount.transfer(120, secondTestAccount)).toThrow(
      new InsufficientFundsError(100),
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => myTestAccount.transfer(1, myTestAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const initialBalance = myTestAccount.getBalance();
    myTestAccount.deposit(100);
    expect(myTestAccount.getBalance()).toBe(initialBalance + 100);
  });

  test('should withdraw money', () => {
    const initialBalance = myTestAccount.getBalance();
    myTestAccount.withdraw(10);
    expect(myTestAccount.getBalance()).toBe(initialBalance - 10);
  });

  test('should transfer money', () => {
    const firstAccInitialBalance = myTestAccount.getBalance();
    const secondAccInitialBalance = secondTestAccount.getBalance();
    myTestAccount.transfer(10, secondTestAccount);
    expect(myTestAccount.getBalance()).toBe(firstAccInitialBalance - 10);
    expect(secondTestAccount.getBalance()).toBe(secondAccInitialBalance + 10);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    (random as jest.Mock).mockImplementation(() => 1);
    expect(typeof (await myTestAccount.fetchBalance()) === 'number').toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockImplementationOnce(() => 50);
    await myTestAccount.synchronizeBalance();
    expect(myTestAccount.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockImplementation(() => 0);
    await expect(myTestAccount.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
