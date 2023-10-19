package model

import (
	"errors"
	"github.com/asaskevich/govalidator"
	uuid "github.com/satori/go.uuid"
	"time"
)

type PixKey struct {
	Base `valid:"required"`
	Kind         string    `json:"kind" valid:"notnull"`
	Key          string    `json:"key" valid:"notnull"`
	AccountID    string    `json:"account_id" valid:"notnull"`
	Account      *Account  `valid:"-"`
	Status       string    `json:"status" valid:"notnull"`
}

type PixKeyRepository interface {
	RegisterKey(pixKey *PixKey) (*PixKey, error)
	FindKeyByKind(key string, kind string) (*PixKey, error)
	AddBank(bank *Bank) error
	AddAccount(account Account) error
	FindAccount(id string) (*Account, error)
}

func (pixKey *PixKey) isValid() error {
	_, err := govalidator.ValidateStruct(pixKey)

	if pixKey.kind != "email" && pixKey.kind != "cpf" {
		return errors.new("invalid type of key")
	}

	if pixKey.status != "active" && pixKey.status != "inactive" {
		return errors.new("invalid status")
	}
	
	if err != nil {
		return err
	}
	
	return nil
}

func NewPixKey(kind string, account *Account, key string) (*PixKey, error) {
	pixKey := PixKey{
		Kind: kind,
		Key: key,
		Account: account,
		Status: "active",
	}

	pixKey.ID = uuid.NewV4().String()
	pixKey.CreatedAt = time.Now()

	err := pixKey.isValid()

	if err != nil {
		return nil, err
	}

	return &pixKey, nil
}